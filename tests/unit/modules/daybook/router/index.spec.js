import daybootRouter from '@/modules/daybook/router';

describe('Pruebas en el router module del Dayboot', () => {
    test('el router debe tener esta configuración', async () => {
        expect(daybootRouter).toMatchObject({
            name: 'dayboot',
            component: expect.any(Function),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any(Function)                        
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any(Function),
                    props: expect.any(Function)                    
                }
            ]
        })        
        const promiseRoutes = []
        daybootRouter.children.forEach( child => promiseRoutes.push(child.component() ))
        const routes = (await Promise.all(promiseRoutes)).map(r => r.default.name)
        expect(routes).toContain('EntryView')
        expect(routes).toContain('NoEntrySelected')
    });

    test('debe retornar el id de la ruta', () => {
        const route = {
            params: {id: 'ABC-123'}
        }
        //expect( daybootRouter.children[1].props(route)).toEqual({id: 'ABC-123'})
        const entryRoute = daybootRouter.children.find( route => route.name === 'entry')
        expect(entryRoute.props(route)).toEqual({id: 'ABC-123'})
    });
});