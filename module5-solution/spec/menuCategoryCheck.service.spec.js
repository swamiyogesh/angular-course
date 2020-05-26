describe('menuitem', function () {

    var service;
    var $httpBackend;
    var ApiPath;

    beforeEach(function () {
        module('common');

        inject(function ($injector) {
            service = $injector.get('MenuService');
            $httpBackend = $injector.get('$httpBackend');
            ApiPath = $injector.get('ApiPath');
        });
    });

    it('should return an error', function () {
        var shortName = 'ss';
        var url = ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json';

        $httpBackend.whenGET(url).respond({ status: '500', error: 'Internal Server Error' });
        service.getMenuItem(shortName).then(function (response) {
            console.log('getMenuItem');
            console.log(response);
            expect(response.data.status).toBe('500');
        });
        $httpBackend.flush();
    });
    it('should return a menu item', function () {
        var shortName = 'l1';
        var url = ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json';

        $httpBackend.whenGET(url).respond(
            {id:193,
            short_name:'L1',
            name:'Orange Chicken',
            description:'chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra',
            price_small:null,
            price_large:9.75,
            small_portion_name:null,
            large_portion_name:null,
            created_at:'2017-03-29T14:22:03.595Z',
            updated_at:'2017-03-29T14:22:03.595Z',
            category_short_name:'L',
            image_present:true});
        service.getMenuItem(shortName).then(function (response) {
            console.log('getMenuItem');
            console.log(response);
            expect(response.data.status).toBe(undefined);
        });
        $httpBackend.flush();
    });

});
