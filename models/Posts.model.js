import Datagent from "datagent";
const { respondData } = Datagent.Hooks;

export default Datagent.Model({
    name: 'posts',
    hooks: {
        fetch: { after: [respondData()] },
        find: { after: [respondData()] },
    }
});