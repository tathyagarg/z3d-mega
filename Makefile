WEBSERVER = asm-ws
WEBSERVER_BIN ?= z3d-ws
WEBSITE_PORT ?= 35323
WEBSITE = website

ZEST = zest
Z3D = z3d

.PHONY: all
all: kill asm-ws zest

.PHONY: asm-ws
asm-ws:
	cd $(WEBSERVER) && PORT=$(WEBSITE_PORT) BIN=$(WEBSERVER_BIN) TEMPLATES_DIR=../$(WEBSITE) make

.PHONY: zest
zest:
	cd $(ZEST) && cargo build --release

.PHONY: z3d
z3d:
	cd $(Z3D) && zig build -Doptimize=ReleaseFast

kill:
	cd $(WEBSERVER) && BIN=$(WEBSERVER_BIN) make kill
