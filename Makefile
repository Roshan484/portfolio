.PHONY: up down rebuild logs clean push studio deploy dev

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

push:
	bun drizzle-kit push

deploy:
	bun deploy

studio:
	bun drizzle-kit studio

dev:
	bun dev