const jsonpath = require('jsonpath');
const { default: dtsGenerator, parseSchema } = require('dtsgenerator');

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.resolve(__dirname, './spec.json');
const OUTPUT_FILE = 'src/types/generated.ts';

const renameKeys = (renameFn) => (obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [renameFn(key)]: obj[key],
    }),
    {},
  );

const replaceKeysToCamelCase = async (json) => {
  // camelcase module supports only regular or dynamic import syntax,
  // so we can't use "require" with this module
  const { default: camelcase } = await import('camelcase');

  jsonpath.apply(json, '$..properties', renameKeys(camelcase));
  jsonpath.apply(
    json,
    '$.paths',
    renameKeys((key) => key.replace(/{(.*?)}/g, camelcase)),
  );
  jsonpath.apply(json, '$..parameters[*].name', camelcase);
  jsonpath.apply(json, '$..required[*]', camelcase);

  return json;
};
const parseSwaggerSchema = (json) => dtsGenerator({ contents: [parseSchema(json)] });
const exportNamespace = (content) => content.replace('declare', 'export');
const writeTypesToFile = (content) => fs.writeFileSync(OUTPUT_FILE, content);

const generateTypesFromFile = (filePath) =>
  fs.readFile(filePath, async (_, data) =>
    replaceKeysToCamelCase(JSON.parse(data))
      .then(replaceKeysToCamelCase)
      .then(parseSwaggerSchema)
      .then(exportNamespace)
      .then(writeTypesToFile),
  );

generateTypesFromFile(FILE_PATH);
