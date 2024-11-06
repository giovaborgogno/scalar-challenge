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
    ],
    collectCoverageFrom: [
        "**/*.{js,jsx}", // Incluye todos los archivos .js y .jsx en el directorio actual
        "!**/node_modules/**", // Excluye node_modules
        "!**/*.test.{js,jsx}", // Excluye archivos de prueba
        "!**/coverage/**", // Excluye el directorio de cobertura si ya existe
    ],
};