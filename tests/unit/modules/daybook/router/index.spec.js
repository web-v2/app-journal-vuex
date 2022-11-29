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
        /*expect( (await daybootRouter.children[0].component()).default.name ).toBe('NoEntrySelected')
        expect( (await daybootRouter.children[1].component()).default.name ).toBe('Entryview')*/
        const promiseRoutes = []
        daybootRouter.children.forEach( child => promiseRoutes.push(child.component() ))
        const routes = (await Promise.all(promiseRoutes)).map(r => r.default.name)
        console.log(routes);
    });
});