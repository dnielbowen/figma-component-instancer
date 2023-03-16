# CSV Figma Component Instancer

This is a Figma plugin [available at the link 
below](https://www.figma.com/community/plugin/1218095779709857260) to create 
multiple instances of a component with varying properties, driven by a simple 
CSV file whose rows define the properties of each instance.

    https://www.figma.com/community/plugin/1218095779709857260

For example the following CSV file would create 10 instances of a component 
with two `TEXT` properties (`prop1` and `prop2`) and one `BOOLEAN` property 
(`prop3`):

```
prop1,prop2,prop3
my text field value,prop 2 valA,val3
prop1 valB,,1
B,,
valD,,0
valE,val2,0
,,
,,
,,
,,
Values above use default property,,1
```

This is especially useful for e.g. creating tables, where you define a table row
as a component with properties for the various text fields and optional
boolean-displayed portions of each row.

## Limitations:

- Only `TEXT` and `BOOLEAN` property types are supported
- `TEXT` data cannot contain commas

# Instructions

Before invoking this plugin, select two items on your page (shift-select for
multiple selection):

  - The first item is the component to instantiate
  - The second item is a frame to insert the instantiated components into

Next, use the "Select CSV file" button to choose a CSV file whose first row
(CSV header row) corresponds to component property names. Each subsequent row
represents an instance with the properties specified in that row.

Then, click the Create button.

# Running

Consult the standard Figma documentation to get this plugin running (or just 
use it from the Figma community page):

  https://www.figma.com/plugin-docs/plugin-quickstart/
