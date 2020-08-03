import { runBenchmarks } from "./deps/std/testing/bench.ts";

import "./vector_bench.ts";
import "./trees/bench.ts";

if (import.meta.main) runBenchmarks();
