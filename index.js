const Choose = (E, F, G) => (E & F) ^ (~E & G);
const Majority = (A, B, C) => (A & B) ^ (A & C) ^ (B & C);

const rot = (A, n) => (A >>> n) | (A << (32 - n));
const Sum0 = (A) => rot(A, 2) ^ rot(A, 13) ^ rot(A, 22);
const Sum1 = (E) => rot(E, 6) ^ rot(E, 11) ^ rot(E, 25);

function logUint32(object) {
  let values = new Uint32Array(Object.values(object));
  Object.keys(object).forEach((key, i) => console.log(`${key.padEnd(2, " ")}: ${values[i].toString(2).padStart(32, "0")}`));
}

function iteration(registers, Wi, Ki) {
  let [A, B, C, D, E, F, G, H] = registers;
  const Ch = Choose(E, F, G);
  const Ma = Majority(A, B, C);
  const S0 = Sum0(A);
  const S1 = Sum1(E);
  const T1 = Wi + Ki + H + Ch + S1;
  const T2 = T1 + Ma + S0;
  const nextRegisters = new Uint32Array([T2, A, B, C, D, E, F, G]);

  [A, B, C, D, E, F, G, H] = nextRegisters;
  logUint32({ Wi, Ki, Ch, Ma, S0, S1, T1, T2, A, B, C, D, E, F, G, H });

  return nextRegisters;
}

let registers = new Uint32Array([2, 3, 5, 7, 11, 13, 17, 19].map((n) => Math.floor(Math.sqrt(n) * 2 ** 32)));
let [A, B, C, D, E, F, G, H] = registers;
logUint32({ A, B, C, D, E, F, G, H });
console.log("");

W = new Uint32Array([3486834537]);
K = new Uint32Array([9235474236]);

registers = iteration(registers, W[0], K[0]);
