describe('Авторизация', () => {

  describe('Регистрация нового пользователя', () => {

    const VALID_EMAIL = 'valid.email@gmail.com'
    const NOT_VALID_EMAIL = 'not.valid@gmail'

    const VALID_PASSWORD = '1234567890'
    const NOT_VALID_PASSWORD = '123456'

    const VALID_PASSWORD_REPEAT = VALID_PASSWORD
    const NOT_VALID_PASSWORD_REPEAT = NOT_VALID_PASSWORD + '0'


    it('Окно регистрации открывается при нажатии на кнопку меню', () => {
      //  arrange
      cy.visit('/')

      //  action
      cy.get('[data-testid=btn-reg-signup] > .v-btn__content').click()

      //  assertions
      cy.url().should('include', '/auth/signup')
    })


    beforeEach(() => {
      cy.visit('/')
      cy.get('[data-testid=btn-reg-signup] > .v-btn__content').click()
    });

    describe('E-mail', () => {
      it('При корректном заполнении - ошибки нет', () => {
        cy.get('[data-testid=reg-email]').type(VALID_EMAIL)

        cy.get('.v-messages__message').should('not.exist')
      })

      it('При НЕ корректном заполнении - ошибка', () => {
        cy.get('[data-testid=reg-email]').type(NOT_VALID_EMAIL)

        cy.get('.v-messages__message').should('exist')
      })
    });

    describe('Пароль', () => {
      it('При корректном заполнении - ошибки нет', () => {
        cy.get('[data-testid=reg-password]').type(VALID_PASSWORD)

        cy.get('.v-messages__message').should('not.exist')
      })

      it('При НЕ корректном заполнении - ошибка', () => {
        cy.get('[data-testid=reg-password]').type(NOT_VALID_PASSWORD)

        cy.get('.v-messages__message').should('exist')
      })
    });

    describe('Повтор пароля', () => {
      it('При корректном заполнении - ошибки нет', () => {
        cy.get('[data-testid=reg-password]').type(VALID_PASSWORD)

        cy.get('[data-testid=reg-password-repeat]').type(VALID_PASSWORD_REPEAT)

        cy.get('.v-messages__message').should('not.exist')
      })

      it('При НЕ корректном заполнении - ошибка', () => {
        cy.get('[data-testid=reg-password]').type(VALID_PASSWORD)

        cy.get('[data-testid=reg-password-repeat]').type(NOT_VALID_PASSWORD_REPEAT)

        cy.get('.v-messages__message').should('exist')
      })
    });

    describe('Кнопка', () => {
      it('При корректно заполненных полях, кнопка разблокируется', () => {
        cy.get('[data-testid=reg-email]').type(VALID_EMAIL)
        cy.get('[data-testid=reg-password]').type(VALID_PASSWORD)
        cy.get('[data-testid=reg-password-repeat]').type(VALID_PASSWORD_REPEAT)

        cy.get('[data-testid=btn-reg-password]').should('not.be.disabled')
      })

      it('При НЕ корректно заполненном хотя бы одном поле, кнопка блокируется', () => {
        cy.get('[data-testid=reg-email]').type(VALID_EMAIL)
        cy.get('[data-testid=reg-password]').type(NOT_VALID_PASSWORD)
        cy.get('[data-testid=reg-password-repeat]').type(VALID_PASSWORD_REPEAT)

        cy.get('[data-testid=btn-reg-password]').should('be.disabled')
      })

      it('При нажатии на кнопку происходит сохранение введенных данных', () => {
        cy.get('[data-testid=reg-email]').type(VALID_EMAIL)
        cy.get('[data-testid=reg-password]').type(VALID_PASSWORD)
        cy.get('[data-testid=reg-password-repeat]').type(VALID_PASSWORD_REPEAT)

        cy.get('[data-testid=btn-reg-password]').click()

        cy.get('.v-snack__content').should('contain', 'Check your email for verify')
      })

      it('При попытке повторно зарегистрироваться - ошибка', () => {
        cy.get('[data-testid=reg-email]').type(VALID_EMAIL)
        cy.get('[data-testid=reg-password]').type(VALID_PASSWORD)
        cy.get('[data-testid=reg-password-repeat]').type(VALID_PASSWORD_REPEAT)

        cy.get('[data-testid=btn-reg-password]').click()

        cy.get('.v-snack__content').should('contain', 'Error')
      })
    })
  });

  describe('Аутентификация нового пользователя', () => {
    it('description', () => {

    });
  })
});
