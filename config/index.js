module.exports = {
  http: {
    host: 'localhost',
    port: 3000
  },
  db: {
    pg: {
      host: 'localhost',
      port: 5432,
      database: 'tdd',
      user: 'postgres',
      password: '271421'
    }
  },
  hash: {
    saltRounds: 10
  },
  token: {
    access: {
      // https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/JSON_Web_Token_Cheat_Sheet_for_Java.md#symptom-5
      secret: `A&'/}Z57M(2hNg=;LE?~]YtRMS5(yZ<vcZTA3N-($>2j:ZeX-BGftaVk)jKP~q?,jk)EMbgt*kW'(`
    }
  }
}