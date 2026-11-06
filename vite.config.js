import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { imageSize } from 'image-size';

const SIZE_QUERY = '?size';

/**
 * Import obrázka s "?size" vráti { url, width, height }.
 * Rozmery sa zistia pri builde, takže prehliadač vie vopred, koľko miesta
 * má fotke vyhradiť, a stránka pri načítaní neposkakuje.
 */
function imageSizePlugin() {
  return {
    name: 'image-size',
    enforce: 'pre',
    load(id) {
      if (!id.endsWith(SIZE_QUERY)) return null;

      const file = id.slice(0, -SIZE_QUERY.length);
      this.addWatchFile(file);

      const { width, height, orientation } = imageSize(readFileSync(file));
      // EXIF orientácia 5–8 = fotka otočená o 90°, prehliadač ju zobrazí naležato
      const rotated = orientation >= 5 && orientation <= 8;

      return `
        import url from ${JSON.stringify(file + '?url')};
        export default {
          url,
          width: ${rotated ? height : width},
          height: ${rotated ? width : height},
        };
      `;
    },
  };
}

export default defineConfig({
  plugins: [imageSizePlugin()],
});
