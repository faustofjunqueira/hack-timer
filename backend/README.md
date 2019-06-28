# Backend


## Development

### Mongo

Start mongo database:

```sh
docker run -d \
  --name mongo-timer \
  -p 27017:27017 \
  -e "MONGO_INITDB_DATABASE=timer" \
  mongo:3.6
```