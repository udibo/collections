import {
  BenchmarkTimer,
  bench,
  runBenchmarks,
} from "./deps/std/testing/bench.ts";

import "./trees/bench.ts";

if (import.meta.main) runBenchmarks();
