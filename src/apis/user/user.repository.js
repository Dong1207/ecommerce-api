
class UserRepository {
   async getUserByAnyField() {

   }
   convertRoleName(roles){
      let authorities = [];
      for (let i = 0; i < roles.length; i++) {
         authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      return authorities
   }
}

module.exports = UserRepository;