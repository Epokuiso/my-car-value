import { unlink } from 'fs';

global.beforeEach ( async () =>
{
    unlink (`${__dirname}/../test.sqlite`, error => { });
});