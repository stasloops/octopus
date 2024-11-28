.PHONY: build-production
build-production: ## Создайте рабочий образ docker.
	docker-compose -f docker-compose.yml build

.PHONY: start-production
start-production: ## Запустите рабочий контейнер docker.
	docker-compose -f docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Остановите рабочий контейнер docker.
	docker-compose -f docker-compose.yml down
