// jest.polyfills.ts
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder/TextDecoder
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Polyfill Web Streams
try {
  const nativeStreams = require('stream/web');
  (global as any).TransformStream = nativeStreams.TransformStream;
  (global as any).ReadableStream = nativeStreams.ReadableStream;
  (global as any).WritableStream = nativeStreams.WritableStream;
} catch {
  const ponyfill = require('web-streams-polyfill/ponyfill');
  (global as any).TransformStream = ponyfill.TransformStream;
  (global as any).ReadableStream = ponyfill.ReadableStream;
  (global as any).WritableStream = ponyfill.WritableStream;
}

// Polyfill BroadcastChannel
if (typeof global.BroadcastChannel === 'undefined') {
  class PolyfillBroadcastChannel {
    name: string;
    constructor(name: string) { this.name = name; }
    postMessage(_msg: any) {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
  }
  (global as any).BroadcastChannel = PolyfillBroadcastChannel;
}
