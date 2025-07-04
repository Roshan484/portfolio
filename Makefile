.PHONY: up down rebuild logs clean migrate deploy

up:
	docker compose up -d

down:
	docker compose down

rebuild:
	docker compose down
	docker compose up -d --build

logs:
	docker compose logs -f

clean:
	docker compose down --volumes --remove-orphans
	docker system prune -f
	docker volume prune -f
	docker network prune -f

migrate:
	docker compose exec backend bun drizzle-kit push

deploy:
	docker compose exec backend bun deploy