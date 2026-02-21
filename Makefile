.PHONY: install dev build clean docker-build docker-run

install:
	npm install

dev:
	npm start

build:
	npm run build

clean:
	rm -rf node_modules/ build/

docker-build:
	docker build -t kon-frontend .

docker-run:
	docker run -p 3000:80 kon-frontend
