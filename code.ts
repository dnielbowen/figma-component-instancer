// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 500, width: 600 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  if (msg.type === 'create-instances') {
    const sels = figma.currentPage.selection;
    const selectionTypes = sels.map(x => x.type);
    if (sels.length === 2 && selectionTypes.includes("COMPONENT") && selectionTypes.includes("FRAME")) {
      const component = sels[(sels[0].type === "COMPONENT" ? 0 : 1)] as ComponentNode;
      const frame = sels[(sels[0].type === "FRAME" ? 0 : 1)] as FrameNode;

      const props = component.componentPropertyDefinitions;

      const { csvData }: { csvData: string } = msg;
      const headers = csvData.split("\n")[0].split(",").map(k => k.trim());

      const properlyNamedHeaders = headers
        .map(k => {
          for (const fullPropName of Object.keys(props)) {
            if (fullPropName.startsWith(k) && fullPropName[k.length] === "#") {
              if (props[fullPropName].type === "BOOLEAN") {
                return {
                  fullPropName,
                  convert: (val: string) => !val ? undefined : !(val === "FALSE" || val === "0"),
                };
              } else if (props[fullPropName].type === "TEXT") {
                return {
                  fullPropName,
                  convert: (val: string) => val,
                };
              }
            }
          }
        })
        .filter(k => k);

      for (const line of csvData.split("\n").slice(1)) {
        const fields = line.split(",");

        const propSetPairs = Object.fromEntries(properlyNamedHeaders
          .map((header, i) => [header?.fullPropName, header?.convert(fields[i])])
          .filter(([k, v]) => k !== undefined && v !== undefined && v !== ""));

        const instance = component.createInstance()
        instance.setProperties(propSetPairs);
        frame.appendChild(instance);
      }
    }
    figma.closePlugin();
  }
};
