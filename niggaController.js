const NiggaStore = [
    {id : 1, name : "Shubham"},
    {id: 2, name: "Drexy"},
    {id: 3, name: "Mafia"}
];

function getNiggers() {
    return NiggaStore;
}

export function getNiggersList() {
    return NiggaStore.length;
}

export default getNiggers;