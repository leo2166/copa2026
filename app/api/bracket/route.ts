// Forzar renderización dinámica: nunca usar la caché de Next.js
export const dynamic = 'force-dynamic';

import fs from 'fs';
import path from 'path';

/**
 * GET /api/bracket
 * Lee bracket.json del disco en cada petición para devolver siempre
 * los datos más recientes (sincronizados por /api/matches con ESPN).
 */
export async function GET() {
  try {
    const bracketFilePath = path.join(process.cwd(), 'data', 'bracket.json');

    if (!fs.existsSync(bracketFilePath)) {
      return Response.json(
        { error: 'No se encontró el archivo bracket.json.' },
        { status: 404 }
      );
    }

    const rawData = fs.readFileSync(bracketFilePath, 'utf-8');
    const bracket = JSON.parse(rawData);

    return Response.json(bracket, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error al leer bracket.json:', error);
    return Response.json(
      { error: 'Error al procesar el bracket.' },
      { status: 500 }
    );
  }
}
