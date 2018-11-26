const settings={
    in: 4,
    hold: 2,
    out: 5,
    sound: true,
    contacts: [
            {
                name: "Helpline",
                number: "ADD NUMBER BEFORE PUBLISHING", //CHANGE BEFORE FINISHING APP - TEST VALUE ONLY
                deletable: false
            }
        ]
}


const reducer = (state=settings, action) => {
    const newState = {...state};
    switch(action.type){
        case 'In': 
            newState.in = action.value;
            console.log('set in to: ', action.value);
            break;
        case 'Hold': 
            newState.hold = action.value;
            console.log('set hold to: ', action.value);
            break;
        case 'Out':
            newState.out = action.value;
            console.log('set out to: ', action.value);
            break;
        case 'SOUND':
            newState.sound = action.value;
            console.log('set sound to ', action.value);
            break;
        case 'DELCONTACT':
            newContacts=[]
            state.contacts.forEach((n, index) => {
            console.log(n['name'], action.value)  
            if (n['name']!=action.value){
                newContacts.push(n)
                console.log('adding ', n)
            }
            newState.contacts=newContacts
         });
            console.log('removed from contacts index: ', action.value);
            console.log('contacts: ', newState.contacts);
            break;
        case 'NEWCONTACT':
            newState.contacts=state.contacts
            newState.contacts.push({name: action.value.name, number: action.value.number, deletable: true})
            console.log(newState.contacts)
            break;
        case 'RESET':
            console.log('resetting contacts')
            newState.contacts=settings.contacts
            break;
    }
    return newState;
};

export default reducer;