run :
	docker-compose up

run_daemon :
	docker-compose up -d ; \
	docker-compose exec apache_php5 /wait

clean :
	rm -Rf data
