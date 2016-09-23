## Installing Redis

On OSX, in the terminal:

curl -O http://download.redis.io/redis-stable.tar.gz
tar -xvzf redis-stable.tar.gz 
rm redis-stable.tar.gz 
cd redis-stable 
make 
sudo make install

### Start a local Redis server
type "redis-server"

## Development

Current Node version is set in .nvmrc. With nvm installed, type "nvm use" to use the correct node version.