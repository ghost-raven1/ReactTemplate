# Makefile for Vite + React project

.PHONY: dev build preview lint format test test-coverage test-e2e test-e2e-dev analyze prepare type-check deploy-staging deploy-prod

## Запуск разработки

dev:
	pnpm dev

## Сборка проекта

build:
	pnpm build

## Предпросмотр production-сборки

preview:
	pnpm preview

## Линтинг кода

lint:
	pnpm lint

## Форматирование кода

format:
	pnpm format

## Юнит-тесты

test:
	pnpm test

## Покрытие тестами

test-coverage:
	pnpm test:coverage

## E2E тесты

test-e2e:
	pnpm test:e2e

## E2E тесты (dev-режим)

test-e2e-dev:
	pnpm test:e2e:dev

## Анализ бандла

analyze:
	pnpm analyze

## Подготовка хуков (husky)

prepare:
	pnpm prepare

## Проверка типов

type-check:
	pnpm type-check

## Деплой на staging

deploy-staging:
	pnpm deploy:staging

## Деплой на production

deploy-prod:
	pnpm deploy:prod 