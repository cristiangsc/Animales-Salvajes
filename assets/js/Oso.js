import Animal from "./Animal.js";

export default class Oso extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    Grunir() {
        return this.sonido();
    }
}