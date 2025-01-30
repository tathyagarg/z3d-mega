# The Z3D mega project
The Z3D mega project is a collection of (currently) 2 projects, which are:
1. Z3D, a 3D Game Engine
2. ASM-WS, a Web Server written in x86-64 Assembly
3. Zest, a custom programming language which transpiles to Z3D compatible Zig

## Upcoming sub-projects to the Z3D Mega Project
2. A Web-IDE for Zest 
3. Syntax highlighting extension for Zest in Visual Studio Code

## The Z3D Game Engine
- A 3D game engine written entirely in Zig with SDL2. No dependencies, no external libraries, just Zig and SDL2.
- The engine is still in development, but it has the following features:
    - A Ray-tracing Engine
    - A 3D Renderer with support for:
        - 0-poly Spheres
        - 1-poly Rectangles
        - A texture renderer (currently only supports PNG files, but more formats will be added in the future)
        - A PNG image parser (reads PNG files binary and converts them to a usable format)
    - A 3D Physics Engine
    - Character controller

### Upcoming features to Z3D
- A 3D Model Loader
- Audio support
- Performance improvements

## ASM-WS
- A Web Server written in x86-64 Assembly. Again, no dependencies, no external libraries, just Assembly.
- Features:
    - A simple HTTP server
    - Support for executing binaries to respond to POST requests
    - Executing shell files to respond to POST requests

### Upcoming features to ASM-WS
- Support for running executables/shell scripts to respond to a GET request (similar to how it works with POST requests)
- More method support (currently only supports GET and POST)
- More HTTP status codes

## Zest
- A custom programming language which transpiles to Z3D compatible Zig
- Features:
    - A simple syntax
    - A simple transpiler
    - Easy to understand syntax

- Currently, it's basically just a configuration file. I'm going to change that soon.

### Upcoming features to Zest
- A full programming language

PS: Extensive use of Github Copilot was made in the making of this project
