WEBSERVER = asm-ws
WEBSERVER_BIN ?= z3d-ws
WEBSITE_PORT ?= 35323
WEBSITE = website

.PHONY: all
all: kill asm-ws

.PHONY: asm-ws
asm-ws:
	cd $(WEBSERVER) && PORT=$(WEBSITE_PORT) BIN=$(WEBSERVER_BIN) TEMPLATES_DIR=../$(WEBSITE) make

kill:
	cd $(WEBSERVER) && BIN=$(WEBSERVER_BIN) make kill
