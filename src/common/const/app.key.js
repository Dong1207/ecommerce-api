class AppKeys {
   static ENV_MODE = Object.freeze({
      DEV: 'dev',
      PROD: 'prod',
      STAGING: 'staging'
   });

   static SCHEMA_OPTIONS = Object.freeze({
      toJSON: {
         virtuals: true,
         aliases: true,
      },
      toObject: {
         virtuals: true,
         aliases: true,
      },
      timestamps: true,
      versionKey: false,
   });
}

module.exports = AppKeys;