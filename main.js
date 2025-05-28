//Bienvenido a Tienda Deportiva SA. Facundo Ayre

//Con esta bandera mantenemos el loop del menú
let bandera = true

//En este array almacenamos los productos que se van creando a la lista
const Productos = []

//En este array guardamos los productos que agregó el usuario y son los que se van a incluir en su compra
let Carrito = []

//Se inicializa en 0 el total de la compra del usuario, cuando se vayan agregando productos al carrito, el valor va a cambiar
let total = 0

function CrearProductos(tipoProducto, marcaProducto, precioProducto) {
	const auxiliar = {
		tipo: tipoProducto,
        marca: marcaProducto,
		precio: precioProducto,
	}

	Productos.push(auxiliar)
}

function mostrarLosProductos() {
	if (Productos.length == 0) {
		alert('No hay productos ingresados en la lista')
		return
	}

	let mensaje = 'Los productos disponibles en nuestra lista son:\n '

	for (let i = 0; i < Productos.length; i++) {
		mensaje += `\n ${Productos[i].tipo} - ${Productos[i].marca} - $ ${Productos[i].precio}`
		//No supe como hacer para mostrar la posición del elemento y después poder capturarlo y que el usuario solo tenga que ingresar un número para elegir
	}

	alert(mensaje)
}

const funcionSeparadoraPorTipo = (array) => {
	const tiposProductos = []
    //Si lograra tomar la posición de los productos en la función previa, acá tendría que ajustar lo que referencia tipo por las referencias a la posición
	for (let i = 0; i < array.length; i++) {
		tiposProductos.push(array[i].tipo)
	}

	return tiposProductos
}

const funcionBuscadora = function (tipoABuscar) {
	const Tipos = funcionSeparadoraPorTipo(Productos)

	let index = Tipos.indexOf(tipoABuscar)

	if (index == -1) {
		alert('Ese producto no lo tenemos cargado en la lista')
	} else {
		const TiposCarrito = funcionSeparadoraPorTipo(Carrito)

		let index2 = TiposCarrito.indexOf(tipoABuscar)

		if (index2 == -1) {
			let objetoDelCarrito = {
				tipo: Productos[index].tipo,
                marca: Productos[index].marca,
				precio: Productos[index].precio,
				cantidad: 1,
			}
			Carrito.push(objetoDelCarrito)
		} else {
			Carrito[index2].cantidad += 1
		}
	}
}

const verCarrito = () => {
	let mensaje = 'Estos son los productos agregados en tu carrito:\n'
	total = 0

	for (let i = 0; i < Carrito.length; i++) {
		total += Number(Carrito[i].precio) * Carrito[i].cantidad
	}

	for (let i = 0; i < Carrito.length; i++) {
		mensaje += `\n * ${Carrito[i].tipo} - ${Carrito[i].marca} - $ ${Carrito[i].precio} - cantidad: ${Carrito[i].cantidad}`
	}

	mensaje += `\n El total a pagar es de $ ${total}`

	alert(mensaje)
}

function terminarCompra() {
	alert(`¡Muchas gracias por su compra, vuelva pronto! Este es su total $${total}`)
	Carrito = []
}

const menu =
	'Bienvenidos a Tienda Deportiva SRL\n 1- Crear/Agregar productos\n 2- Ver productos disponibles\n 3- Agregar producto al carrito\n 4- Ver carrito\n 5- Terminar compra\n 0- Salir'

while (bandera) {
	let opciones = Number(prompt(menu))

	switch (opciones) {
		case null:
		case 0:
			bandera = false
			break
		case 1:
			let auxiliarTipo = prompt('¿Qué tipo de producto es?')
			let auxiliarMarca = prompt('¿Cuál es la marca del producto?')
			let auxiliarPrecio = prompt('¿Cuánto vale el producto?')
			CrearProductos(auxiliarTipo, auxiliarMarca, auxiliarPrecio)
			break
		case 2:
            mostrarLosProductos()
			break
		case 3:
			let auxProductoABuscar = prompt('¿Qué producto quiere comprar?') //Cómo puedo agregar la lista de productos para que el usuario la vea? Productos.tipo no funciona. Habrá que usar el DOM?
			funcionBuscadora(auxProductoABuscar)
			break
		case 4:
			verCarrito()
			break
		case 5:
			terminarCompra()
			break
		default:
			alert('Ingrese una opción válida')
			break
	}
}