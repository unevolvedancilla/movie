//re-usable code for autocomplete widget. 

const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => { //object destructuring

//bulma styling
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input">
    <div class="dropdown">
        <div class="dropdown-menu"> 
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async event => {
        const items = await fetchData(event.target.value)
        if(!items.length) { //close dropdown if empty response/empty query
            dropdown.classList.remove('is-active');
            return;
        }
        resultsWrapper.innerHTML = ''; //clear out any existing items
        dropdown.classList.add('is-active'); //open the dropdown
        for(let item of items){
            const option = document.createElement('a')
            option.classList.add('dropdown-item') //style
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => { //run when an item is clicked on
                dropdown.classList.remove('is-active'); //close dropdown
                input.value = inputValue(item); //update input text to selected item
                onOptionSelect(item);
            })
            resultsWrapper.appendChild(option);
        } 
    }

    input.addEventListener('input', debounce(onInput, 500)) //debounce

    document.addEventListener('click', event => { //close dropdown if user clicks outside of Autocomplete widget
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active')
        }
    })
}