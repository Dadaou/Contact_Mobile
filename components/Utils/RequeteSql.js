const requetes = {

    CreerTableContact: "CREATE TABLE IF NOT EXISTS contact (ctt_id INTEGER PRIMARY KEY AUTOINCREMENT, ctt_photo TEXT, ctt_nom TEXT, ctt_prenom TEXT, ctt_prenom_usage TEXT, ctt_entreprise TEXT, ctt_service TEXT, ctt_fonction TEXT, ctt_anniversaire DATE, ctt_siteweb TEXT, ctt_twitter TEXT, ctt_linkedin TEXT, ctt_facebook TEXT, ctt_skype TEXT, ctt_notes TEXT, ctt_corbeille INTEGER, ctt_favoris INTEGER, ctt_etat INTEGER, util_id INTEGER, ctt_id_web INTEGER, src_id INTEGER, est_insererdansweb INTEGER, est_maj INTEGER)",
    CreerTableTelephone: "CREATE TABLE IF NOT EXISTS telephone (tel_id INTEGER PRIMARY KEY AUTOINCREMENT, tel_numero TEXT, tel_code_pays TEXT, tel_libelle TEXT, ctt_id INTEGER, util_id INTEGER, ctt_id_web INTEGER, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))",
    CreerTableMail: "CREATE TABLE IF NOT EXISTS mail (ml_id INTEGER PRIMARY KEY AUTOINCREMENT, ml_mail TEXT, ml_libelle TEXT, ctt_id INTEGER, util_id INTEGER, ctt_id_web INTEGER, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))",
    CreerTableAdresse: "CREATE TABLE IF NOT EXISTS adresse (addr_id INTEGER PRIMARY KEY AUTOINCREMENT, addr_ligne1 TEXT, addr_ligne2 TEXT, addr_ligne3 TEXT, addr_ville TEXT, addr_pays TEXT, addr_bp TEXT, addr_cp TEXT, addr_libelle TEXT, ctt_id INTEGER, util_id INTEGER, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))",
    GetContact: "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_prenom_usage, ctt_anniversaire, ctt_corbeille, ctt_entreprise, ctt_etat, ctt_facebook, ctt_favoris, ctt_fonction, ctt_linkedin, ctt_notes, ctt_service, ctt_siteweb, ctt_skype, ctt_twitter, ctt_etat, util_id, ctt_id_web, src_id FROM contact WHERE ctt_id = ?",
    GetTelephone: "SELECT tel_libelle, tel_numero FROM telephone WHERE ctt_id = ?",
    GetMail: "SELECT ml_mail, ml_libelle FROM mail WHERE ctt_id = ?",
    GetAdresse: "SELECT addr_ligne1, addr_ligne2, addr_ligne3, addr_ville, addr_pays, addr_bp, addr_cp, addr_libelle FROM adresse WHERE ctt_id = ?",
    InsererContact: "INSERT INTO contact (ctt_photo, ctt_prenom, ctt_nom, ctt_prenom_usage, ctt_entreprise, ctt_fonction, ctt_anniversaire, ctt_notes, ctt_service, ctt_siteweb, ctt_twitter, ctt_linkedin, ctt_facebook, ctt_skype, ctt_etat, ctt_favoris, util_id, ctt_id_web, src_id, ctt_corbeille, est_insererdansweb, est_maj) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    InsererTelephone: "INSERT INTO telephone (tel_numero, tel_libelle, ctt_id, util_id, ctt_id_web) VALUES (?,?,?,?,?)",
    InsererMail: "INSERT INTO mail (ml_mail, ml_libelle, ctt_id, util_id, ctt_id_web) VALUES (?,?,?,?,?)",
    InsererAdresse: "INSERT INTO adresse (addr_ligne1, addr_ligne2, addr_ligne3, addr_cp, addr_bp, addr_pays, addr_ville, addr_libelle, ctt_id) VALUES (?,?,?,?,?,?,?,?,?)",
    MajContact: "UPDATE contact SET ctt_photo = ?, ctt_nom = ?, ctt_prenom = ?, ctt_prenom_usage = ?, ctt_entreprise = ?, ctt_service = ?, ctt_fonction = ?, ctt_anniversaire = ?, ctt_siteweb = ?, ctt_twitter = ?, ctt_linkedin = ?, ctt_facebook = ?, ctt_skype = ?, ctt_notes = ?, ctt_etat = ?, est_maj = ? WHERE ctt_id = ?",
    SupprContact: "DELETE FROM contact WHERE ctt_id = ?",
    SupprTelephone: "DELETE FROM telephone WHERE ctt_id = ?",
    SupprMail: "DELETE FROM mail WHERE ctt_id = ?",
    SupprAdresse: "DELETE FROM adresse WHERE ctt_id = ?"
}

export default requetes