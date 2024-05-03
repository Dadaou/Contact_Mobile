const requetes = {

    GetContact: "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_prenom_usage, ctt_anniversaire, ctt_corbeille, ctt_entreprise, ctt_etat, ctt_facebook, ctt_favoris, ctt_fonction, ctt_linkedin, ctt_notes, ctt_service, ctt_siteweb, ctt_skype, ctt_twitter, ctt_etat FROM contact WHERE ctt_id = ?",
    GetTelephone: "SELECT tel_libelle, tel_numero FROM telephone WHERE ctt_id = ?",
    GetMail: "SELECT ml_mail, ml_libelle FROM mail WHERE ctt_id = ?",
    GetAdresse: "SELECT addr_ligne1, addr_ligne2, addr_ligne3, addr_ville, addr_pays, addr_bp, addr_cp, addr_libelle FROM adresse WHERE ctt_id = ?",
    InsererContact: "INSERT INTO contact (ctt_photo, ctt_prenom, ctt_nom, ctt_prenom_usage, ctt_entreprise, ctt_fonction, ctt_anniversaire, ctt_notes, ctt_service, ctt_siteweb, ctt_twitter, ctt_linkedin, ctt_facebook, ctt_skype, ctt_etat, ctt_favoris, util_id, synchronise) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    InsererTelephone: "INSERT INTO telephone (tel_numero, tel_libelle, ctt_id,  util_id) VALUES (?,?,?,?)",
    InsererMail: "INSERT INTO mail (ml_mail, ml_libelle, ctt_id, util_id) VALUES (?,?,?,?)",
    InsererAdresse: "INSERT INTO adresse (addr_ligne1, addr_ligne2, addr_ligne3, addr_cp, addr_bp, addr_pays, addr_ville, addr_libelle, ctt_id) VALUES (?,?,?,?,?,?,?,?,?)",
    MajContact: "UPDATE contact SET ctt_photo = ?, ctt_nom = ?, ctt_prenom = ?, ctt_prenom_usage = ?, ctt_entreprise = ?, ctt_service = ?, ctt_fonction = ?, ctt_anniversaire = ?, ctt_siteweb = ?, ctt_twitter = ?, ctt_linkedin = ?, ctt_facebook = ?, ctt_skype = ?, ctt_notes = ?, ctt_etat = ? WHERE ctt_id = ?",
    SupprContact: "DELETE FROM contact WHERE ctt_id = ?",
    SupprTelephone: "DELETE FROM telephone WHERE ctt_id = ?",
    SupprMail: "DELETE FROM mail WHERE ctt_id = ?",
    SupprAdresse: "DELETE FROM adresse WHERE ctt_id = ?"
}

export default requetes