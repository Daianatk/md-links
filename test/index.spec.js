import { isPathAbsolute, isFile, isDirectory, readFile, readDirectory, isMarkdown, readAllFiles, extractedLink, validateLinks } from '../src/index.js';
import mock from 'mock-fs';
import process from 'process';
import path from 'path';
import fetchMock from '../_mocks_/node-fetch.js';
fetchMock.config.sendAsJson = false;
fetchMock
  .mock('https://pe.search.yahoo-/', 404)
  .mock('https://firebase.google.com/?hl=es-419', 200)
  .mock('http://www.clubsocialhuaral.com/', 404);


beforeEach(() => {
  mock({
    'example': {
      'README.md': 'Leeme!!!! ![Github]https://github.com/Daianatk/md-links ![Google]https://www.google.com/searc',
      'example1': {
        'README.md': '![Markdown](https://es.wikipedia.org/wiki/Markdown)(Es un tipo de archivo con extension)'
      },
    },
    'lib': {
      'hello.js': 'hello world',
    }
  });
});
afterEach(mock.restore);

describe('funcion que indica si la ruta es absoluta', () => {
  it('deberia ser una funcion', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });
  it('deberia retornar true si la ruta es absoluta', () => {
    expect(isPathAbsolute('/home/diana/Desktop/LIM009-fe-md-links')).toBe('/home/diana/Desktop/LIM009-fe-md-links');
  });
  it('deberia retornar una ruta absoluta si es relativa', () => {
    expect(isPathAbsolute('./README.md')).toBe('/home/diana/Desktop/LIM009-fe-md-links/README.md');
  });
});

describe('funcion que indica si es archivo', () => {
  it('deberia ser una funcion', () => {
    expect(typeof isFile).toBe('function');
  });
  it('deberia retornar true si es un archivo', () => {   
    expect(isFile('example/README.md')).toBe(true);
  });
  it('deberia retornar false si no es un archivo', () => {
    expect(isFile(path.join(process.cwd(),'example'))).toBe(false);
  });
  it('deberia fallar si la ruta no existe', () => {
    try {
      isFile('index');
    } catch (err) {
      expect(err.code).toBe('ENOENT');
    }        
  });
});

describe('funcion que indica si es una carpeta', () => {
  it('deberia ser una funcion', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('deberia retornar true si es una carpeta', () => {
    expect(isDirectory(path.join(process.cwd(),'example'))).toBe(true);
  });
  it('deberia retornar false si no es una carpeta', () => {
    expect(isDirectory(path.join(process.cwd(),'example/README.md'))).toBe(false);
  });
  it('deberia fallar si la carpeta no existe', () => {
    try {
      isDirectory('src');
    } catch (err) {
      expect(err.code).toBe('ENOENT');
    }      
  });
});

describe('funcion que lee un archivo', () => {
  it('deberia ser una funcion', () => {
    expect(typeof readFile).toBe('function');
  });
  it('deberia leer un archivo', () => {
    expect(readFile('example/README.md')).toBe('Leeme!!!! ![Github]https://github.com/Daianatk/md-links ![Google]https://www.google.com/searc');
  });
});

describe('funcion que lee una carpeta', () => {
  it('deberia ser una funcion', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('deberia leer una carpeta y retornar un array', () => {
    expect(readDirectory('/home/diana/Desktop/LIM009-fe-md-links/example')).toEqual(["/home/diana/Desktop/LIM009-fe-md-links/example/README.md", "/home/diana/Desktop/LIM009-fe-md-links/example/example1"]);
  });
});

describe('Funcion que identifica si es markdown', () => {
  it('deberia ser una funcion', () => {
    expect(typeof isMarkdown).toBe('function');
  });
  it('deberia retornar true si es markdown', () => {
    expect(isMarkdown('README.md')).toBe(true);
  });
  it('deberia retornar false si no es markdown', () => {
    expect(isMarkdown('index.js')).toBe(false);
  });
});

describe('Funcion que deberia leer todos los archivos .md', () => {
  it('deberia ser una funcion', () => {
    expect(typeof readAllFiles).toBe('function');
  });
  it('deberia leer una carpeta y retornar el array con archivos .md', () => {
    expect(readAllFiles('/home/diana/Desktop/LIM009-fe-md-links/example/example1')).toEqual([ '/home/diana/Desktop/LIM009-fe-md-links/example/example1/README.md']);
  });
});

describe('Funcion que lee un archivo .md y muestra un array de objetos', () => {
  it('deberia ser una funcion', () => {
    expect(typeof extractedLink).toBe('function');
  });
  it('deberia leer un archivo .md y mostrar un array de objetos', () => {
    expect(extractedLink('/home/diana/Desktop/LIM009-fe-md-links/example/README.md')).toEqual([ { href: 'https://github.com/Daianatk/md-links', text: 'https://github.com/Daianatk/md-links', file:
     '/home/diana/Desktop/LIM009-fe-md-links/example/README.md' }, { href: 'https://www.google.com/searc', text: 'https://www.google.com/searc', file:
     '/home/diana/Desktop/LIM009-fe-md-links/example/README.md' } ]);
  });
});

describe('función validateLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof validateLinks).toBe('function');
  });
})