SHELL=/bin/bash

setup:
	npm install
	@echo "#### Dependencies installed correctly ####"
	@echo "`tput bold``tput setaf 1`#### All Configurations set, you can now start coding ####`tput sgr0`"
run: ./public/public.pem node_modules
	@echo "#### Running develop mode ####"
	npm run dev
build: ./public/public.pem node_modules
	npm run build		
	@echo "#### Production build created ####"
	@echo "#### Running production mode ####"
	npm start
test: ./public/public.pem node_modules
	@echo "#### Running tests ####"
	npm run test	
lint: ./public/public.pem node_modules
	@echo "#### Running lint scanner ####"
	npm run lint

update_config:
ifeq ("$(type)", "commit")
	gsutil cp .env.tmp gs://$(bucket)/iam/backoffice/front/.env
	rm .env.tmp
else
	gsutil cp gs://$(bucket)/iam/backoffice/front/.env .env.tmp
endif

ifeq ("$(type)", "add")
	echo $(value) >> .env.tmp
	gsutil cp .env.tmp gs://$(bucket)/iam/backoffice/front/.env
	rm .env.tmp
endif

deploy:
	docker build -t appcopa .
	docker run -p 8080:80 appcopa:latest
