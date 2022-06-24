import Animal from "./Animal.js";
export default class Aguila extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Chillar() {
        return this.sonido();
    }
}