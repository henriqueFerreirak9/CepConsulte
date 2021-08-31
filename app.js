var submit = document.querySelector('#app form button')

var zipCodeFeild = document.querySelector('#app form input')

var content = document.querySelector('#app main')


submit.addEventListener('click', run)

function run(event){
    event.preventDefault()


    var zipCode = zipCodeFeild.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios
    .get('https://viacep.com.br/ws/'+ zipCode + '/json/')
    .then(function(response){
        if(response.data.erro){
          throw new Error('CEP INVALIDO')
        }
        content.innerHTML = ('')
        creatLine(response.data.logradouro)
        creatLine(response.data.localidade)
        creatLine(response.data.uf)
        creatLine(response.data.bairro)
  
        
    }).catch(function(error){
        content.innerHTML = ('')
        console.log(error)
        creatLine('ops, algo deu errado')
    })


    function creatLine(text){
        var line = document.createElement('p')
        var linetxt = document.createTextNode(text)
        line.appendChild(linetxt)
        content.appendChild(line)
    }
}