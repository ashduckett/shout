class ProjectCollection {
    constructor() {
        this.projects = []
    }

    addProject(project) {
        this.projects.push(project);
      //  this.broadcast(project, 'addition')
    }

    addShout(projectId, shout) {
        let project = this.projects.filter(project => project.id === projectId)[0];
        project.shouts.push(shout);    
    }

    loadProjects(callMeOnSuccess) {
        var _this = this;

        $.post(rootFolder + '/API.php', { method: 'get_all', type: 'SchedulingProject' }, function (data) {
                
            var obj = JSON.parse(data);

            // So we build a list of projects
            $.each(obj, function (key, val) {
                _this.addProject(new Project(val.data.id, val.data.name));
            });

            var model = new ShoutModel();
            model.loadAllShouts(function() {

                if(model.shouts.length > 0) {
                    model.shouts.forEach(function(element) {
                        _this.addShout(element.project_id, new Shout(element.id, element.project_id, element.text, element.date, element.time));
                    });
                }
                callMeOnSuccess();   
            });
        });
    }

    getProjects() {
        return this.projects;
    }

    getProjectById(id) {
        return this.projects[id];
    }

    removeProjectWithId(id) {
        this.projects = this.projects.filter(project => {project.id !== id});
    }

    updateProject(project) {
        this.projects[project.id] = project;
    }
}