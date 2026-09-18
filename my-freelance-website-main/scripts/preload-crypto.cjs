// Ensure a webcrypto-like globalThis.crypto.hash exists before Vite loads.
const nodeCrypto = require('crypto');
const webcrypto = nodeCrypto.webcrypto || nodeCrypto;

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

if (!globalThis.crypto.hash) {
  globalThis.crypto.hash = async (alg, data) => {
    const algo = typeof alg === 'string' ? alg : alg?.name || 'SHA-256';
    if (webcrypto && webcrypto.subtle && typeof webcrypto.subtle.digest === 'function') {
      const result = await webcrypto.subtle.digest(algo.replace('-', ''), data);
      return new Uint8Array(result);
    }
    const { createHash } = nodeCrypto;
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
    return createHash(algo.replace('-', '').toLowerCase()).update(buf).digest();
  };
}
