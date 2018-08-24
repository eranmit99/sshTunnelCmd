# Install
npm install -g ./   

# Usage
1. Create a new config.json file: 

		example file:
		{
			"port": 22,
			"dstPort": 6379,
			"localHost": "127.0.0.1",
			"localPort": 6380,
			"keepAlive": true,
			"rsa": "path/to/id_rsa",
			"username": "user"
		}


2. Configure sshTunnel 

		sshTunnel -c path/to/config.json 

3. Start sshTunnel

		sshTunnel -h 54.149.120.41 -d destination.server.location.amazonaws.com


