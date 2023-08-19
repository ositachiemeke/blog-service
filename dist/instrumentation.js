"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_node_1 = require("@opentelemetry/sdk-node");
const exporter_trace_otlp_proto_1 = require("@opentelemetry/exporter-trace-otlp-proto");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const sdk_metrics_1 = require("@opentelemetry/sdk-metrics");
const sdk = new sdk_node_1.NodeSDK({
    traceExporter: new exporter_trace_otlp_proto_1.OTLPTraceExporter({
        headers: {}
    }),
    metricReader: new sdk_metrics_1.PeriodicExportingMetricReader({
        exporter: new sdk_metrics_1.ConsoleMetricExporter()
    }),
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()]
});
sdk.start();
