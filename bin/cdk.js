#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@aws-cdk/core");
const cdk_stack_1 = require("../lib/cdk-stack");
const stack = new cdk_stack_1.CdkStack(new core_1.App(), "CdkStack", {
    description: "description",
});
