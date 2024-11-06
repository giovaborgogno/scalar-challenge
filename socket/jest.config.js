module.exports = {
    "reporters": [
        "default",
        ["jest-junit", {
            addFileAttribute: "true",
            ancestorSeparator: " › ",
            classNameTemplate: "{classname}",
            titleTemplate: "{title}", // outputname
            outputName: "TEST-socket.xml"
        }]
    ]
};