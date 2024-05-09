import * as fs from 'fs';
import jsonpath from 'jsonpath';
import dtsGenerator, { parseSchema } from 'dtsgenerator';

const SCHEMA_URL = 'API_URL_HERE';
const OUTPUT_FILE = 'src/types/generated.ts';

const renameKeys = (renameFn) => (obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [renameFn(key)]: obj[key],
    }),
    {}
  );

const replaceKeysToCamelCase = async (json) => {
  // camelcase module supports only regular or dynamic import syntax,
  // so we can't use "require" with this module
  const { default: camelcase } = await import('camelcase');

  jsonpath.apply(json, '$..properties', renameKeys(camelcase));
  jsonpath.apply(
    json,
    '$.paths',
    renameKeys((path) => path.replace(/{(.*?)}/g, camelcase))
  );
  jsonpath.apply(json, '$..parameters[*].name', camelcase);
  jsonpath.apply(json, '$..required[*]', camelcase);

  return json;
};
const parseSwaggerSchema = (json) =>
  dtsGenerator({ contents: [parseSchema(json)] });
const exportNamespace = (content) => content.replace('declare', 'export');
const writeTypesToFile = (content) => fs.writeFileSync(OUTPUT_FILE, content);

const generateTypes = async () => {
  await fetch(SCHEMA_URL)
    .then((data) => data.json())
    .then(replaceKeysToCamelCase)
    .then(parseSwaggerSchema)
    .then(exportNamespace)
    .then(writeTypesToFile);
};

generateTypes();
