{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/aaff8c16d7fc04991cac6245bee1baa31f72b1e1.tar.gz") {}}:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
  ];

  shellHook = ''
    echo "Node.js version: $(node -v)"
    echo "npm version: $(npm -v)"
    export PATH="./node_modules/.bin:$PATH"
  '';
}