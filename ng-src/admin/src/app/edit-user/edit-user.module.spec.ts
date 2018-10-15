import { EditUserModule } from './edit-user.module';

describe('EditUserModule', () => {
  let editUserModule: EditUserModule;

  beforeEach(() => {
    editUserModule = new EditUserModule();
  });

  it('should create an instance', () => {
    expect(editUserModule).toBeTruthy();
  });
});
