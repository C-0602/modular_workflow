# Overview

This project demonstrates a configuration-driven workflow engine integrated with a dynamic request controller in NestJS.
The goal is to centralize and standardize request validation, security checks, and request preprocessing without duplicating logic across multiple controllers.


Demo Project integrated with 1 feature of this service, to show modular_workflow ability to be integrated in other services easily: https://github.com/C-0602/demo_modularworkflow_integrated


The solution contains two core parts:

🔹 Modular Workflow Engine

A pluggable, configurable system that executes a sequence of workflow steps before any request is processed.

Workflow modules include:
Schema Validation
Enum Validation
Token Verification
JWT Verification
Session Cookie Validation

Each module is independent and easily extendable.

🔹 DynamicController

A controller that:

Listens to all incoming requests (@All('*'))

Matches API definitions from configuration

Executes the workflow pipeline

Forwards the request only if all steps succeed

This architecture supports API governance, dynamic routing, and centralized validation.

## Key Features
✔ Configuration-Driven Workflows

Workflows are defined entirely through configuration

Modular steps can be reordered or replaced without touching business logic

✔ Modular Architecture

Independent workflow modules:

- Validate Schema

- Validate Enum

- API Token Check

- JWT Check

- Session Cookie Check


✔ Centralized Request Processing

DynamicController handles routing, workflow execution, and forwarding in one place.

✔ Extensible and Reusable

The workflow engine functions as a standalone package that can be reused across services.

✔ Strict Separation of Concerns

Business logic remains clean while validation/security is handled centrally.

## How It Works
Step 1: Request enters DynamicController

Every incoming request is intercepted by:

@All('*')

Step 2: Route Matching

The controller finds which API configuration matches the incoming URL.

If no match is found:

{ "error": "not_found" }

Step 3: Workflow Execution

The workflow engine executes each module sequentially:

Schema Validation

Enum Validation

Token Check

JWT Check

Session Validation

- If any module fails → request stops immediately.

Step 4: Proxy Forwarding

If workflow succeeds, request is forwarded to a target URL.

If the target is not real → timeout is expected.
This does not affect workflow correctness.

## How to Run the Project
Install dependencies
npm install

Start server
npm run start:dev

Service URL
http://localhost:8080


No external systems required to test workflow behavior.

## How to Test Using Postman

Use:

POST http://localhost:8080/test


## What Reviewers Can Verify

DynamicController intercepts all requests

Correct API route matching

Workflow pipeline loads and executes correctly

Any module failure stops pipeline

Valid requests pass workflow

Forwarding is triggered only after all checks

Code quality, modularity, and architecture alignment

This confirms correctness and production-ready design.

## Conclusion

This project demonstrates a clean, scalable, configuration-driven workflow engine built on NestJS.
By separating validation, security, and routing into modular workflow steps and defining behavior in configuration, the solution achieves:
High reusability
Centralized governance
Clean business logic
Easy extension


The POSTMAN.md guide ensures all workflow behaviors are verifiable without external dependencies.
