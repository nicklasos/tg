t:
	node commands/t.js

ttg:
	node commands/ttg.js

save:
	node commands/save.js

start-save:
	pm2 start commands/save.js

stop-save:
	pm2 stop save

restart-save:
	pm2 restart save

generate-post:
	node commands/generate_post.js