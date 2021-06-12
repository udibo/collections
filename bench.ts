import { runBenchmarks } from "./test_deps.ts";

import "./vector_bench.ts";
import "./trees/bench.ts";

if (import.meta.main) runBenchmarks();
