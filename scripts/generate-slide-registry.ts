#!/usr/bin/env -S node --no-warnings
// @ts-nocheck
/*
  Генерирует src/components/slide-registry.ts на основе файлов в src/components/slides.
  Имена экспортов соответствуют default-экспортам каждого файла.
*/
import fs from 'fs';
import path from 'path';
import { createGenerator } from 'ts-json-schema-generator';

const projectRoot = path.resolve(__dirname, '..');
const slidesDir = path.join(projectRoot, 'src', 'components', 'slides');
const outFile = path.join(projectRoot, 'src', 'components', 'slide-registry.ts');
const schemasOutFile = path.join(projectRoot, 'src', 'components', 'slide-schemas.ts');

/**
 * Преобразует имя файла в имя компонента (без расширения).
 * Пример: 04-LogAnalysisSlide.tsx -> LogAnalysisSlide
 */
function fileNameToComponent(fileName: string): string {
	const base = fileName.replace(/\.(t|j)sx?$/, '');
	const parts = base.split('-');
	// если имя вида NN-Name, берём часть после первого дефиса
	return parts.length > 1 ? parts.slice(1).join('-') : base;
}

function toValidIdentifier(name: string): string {
	return name.replace(/[^a-zA-Z0-9_$]/g, '');
}

function main(): void {
	if (!fs.existsSync(slidesDir)) {
		console.error('Не найдена папка со слайдами:', slidesDir);
		process.exit(1);
	}

	const files = fs
		.readdirSync(slidesDir)
		.filter((f) => /\.(t|j)sx?$/.test(f) && !/\.d\.ts$/.test(f) && !/\.stories\./.test(f));

	// Сортируем по имени файла, чтобы сохранить естественный порядок по префиксу
	files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

	const imports: string[] = [];
	const entries: string[] = [];
	const schemaImports: string[] = [];
	const schemaEntries: string[] = [];

	for (const file of files) {
		const componentName = fileNameToComponent(file);
		const identifier = toValidIdentifier(componentName);
		const importPath = `./slides/${file.replace(/\.(t|j)sx?$/, '')}`;
		imports.push(`import ${identifier} from '${importPath}';`);
		entries.push(`  ${identifier},`);

		// Попытка найти экспорт типа публичных пропсов для каждого слайда: <ComponentName>PublicProps
		const propsTypeName = `${identifier}PublicProps`;
		const slideFileAbs = path.join(slidesDir, file);

		try {
			const generator = createGenerator({
				path: slideFileAbs,
				tsconfig: path.join(projectRoot, 'tsconfig.json'),
				type: propsTypeName,
				skipTypeCheck: true,
				additionalProperties: false,
			} as any);
			const schema = generator.createSchema(propsTypeName);
			const schemaConstName = `${identifier}PropsSchema`;
			schemaEntries.push(`  ${JSON.stringify(identifier)}: ${schemaConstName},`);
			schemaImports.push(`const ${schemaConstName} = ${JSON.stringify(schema)} as const;`);
		} catch (e) {
			// если тип не найден — пропускаем, слайд будет без схемы
			console.warn(`Schema generation skipped for ${identifier}: ${(e as Error).message}`);
		}
	}

	const header = `// Этот файл сгенерирован автоматически. Не редактируйте вручную.\n`;
	const body = `export const slideComponentRegistry: Record<string, React.ComponentType<any>> = {\n${entries.join('\n')}\n};\n`;
	const reactImport = `import React from 'react';`;

	const result = [header, reactImport, ...imports, '', body, ''].join('\n');

	fs.writeFileSync(outFile, result, 'utf8');

	const schemasHeader = `// Этот файл сгенерирован автоматически. Не редактируйте вручную.\n`;
	const schemasBody = `export const slideComponentSchemas: Record<string, any> = {\n${schemaEntries.join('\n')}\n};\n`;
	const schemasResult = [schemasHeader, ...schemaImports, '', schemasBody, ''].join('\n');
	fs.writeFileSync(schemasOutFile, schemasResult, 'utf8');
	console.log('Сгенерирован реестр слайдов:', path.relative(projectRoot, outFile));
}

main();


